function decode (json) {
  if (!json.UTF8Encoding) {
    return json
  }
  let encodeScale = json.UTF8Scale
  if (encodeScale == null) {
    encodeScale = 1024
  }

  let features = json.features

  for (let f = 0; f < features.length; f++) {
    let feature = features[f]
    let geometry = feature.geometry
    let coordinates = geometry.coordinates
    let encodeOffsets = geometry.encodeOffsets

    for (let c = 0; c < coordinates.length; c++) {
      let coordinate = coordinates[c]

      if (geometry.type === 'Polygon') {
        coordinates[c] = decodePolygon(coordinate, encodeOffsets[c], encodeScale)
      } else if (geometry.type === 'MultiPolygon') {
        for (let c2 = 0; c2 < coordinate.length; c2++) {
          let polygon = coordinate[c2]
          coordinate[c2] = decodePolygon(polygon, encodeOffsets[c][c2], encodeScale)
        }
      }
    }
  }
  // Has been decoded
  json.UTF8Encoding = false
  return json
}

function decodePolygon (coordinate, encodeOffsets, encodeScale) {
  let result = []
  let prevX = encodeOffsets[0]
  let prevY = encodeOffsets[1]

  for (let i = 0; i < coordinate.length; i += 2) {
    let x = coordinate.charCodeAt(i) - 64
    let y = coordinate.charCodeAt(i + 1) - 64
    // ZigZag decoding
    x = x >> 1 ^ -(x & 1)
    y = y >> 1 ^ -(y & 1)
    // Delta deocding
    x += prevX
    y += prevY

    prevX = x
    prevY = y
    // Dequantize
    result.push([x / encodeScale, y / encodeScale])
  }

  return result
}

function coordinatesMax (arr) {
  let max = 0
  let b
  arr.forEach((a, i) => {
    if ( max < a[0].length ){
      max = a[0].length
      b = i
    }
  })
  return arr[b]
}

module.exports = {
  decode: decode,
  coordinatesMax: coordinatesMax
}
