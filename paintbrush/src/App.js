import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid;
  position: relative;
`;
const Box = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  border: 1px solid red;
`;

function App() {
  const [first, setFirst] = useState({
    x: 0,
    y: 0,
  });
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [draw, setDraw] = useState(true);

  const handleDraw = () => {
    setDraw((prev) => !prev);
  };

  const hanldeMouseDown = e => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (draw && drawStatus) {
      setFirst({ x: offsetX, y: offsetY });
    }
  };
  const [drawStatus, setDrawStatus] = useState(true);

  const handleMouseMove = e => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (drawStatus) {
      if (first.x !== 0 && first.y !== 0) {
        if (first.x < offsetX) {
          setWidth(offsetX - first.x);
        }
        if (first.y < offsetY) {
          setHeight(offsetY - first.y);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setDrawStatus(false);
  };

  return (
    <div className="App">
      <button onClick={handleDraw}>네모</button>
      <span>{draw ? "그릴 수 있습니다" : "그릴 수 없습니다"}</span>
      <Container
        onMouseDown={hanldeMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {first.x > 0 && first.y > 0 && (
          <Box x={first.x} y={first.y} width={width} height={height} />
        )}
      </Container>
    </div>
  );
}

export default App;
