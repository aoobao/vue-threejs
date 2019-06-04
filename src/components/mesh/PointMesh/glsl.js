export const vertexShader = `
    attribute float scale;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = scale * ( 300.0 / - mvPosition.z ) + 3.0;
      gl_Position = projectionMatrix * mvPosition;
    }
`

export const fragmentShader = `
    uniform vec3 color;
    void main() {
      if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.5 ) discard;
      gl_FragColor = vec4( color, 1.0 );
    }

`