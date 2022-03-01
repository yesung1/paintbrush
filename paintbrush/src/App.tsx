import React, { createRef, useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid;
  position: relative;
`;
const Box = styled.div<{ x: number; y: number; width: number; height: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  position: absolute;
  top: ${({ y }) => `${y}px`};
  left: ${({ x }) => `${x}px`};
  border: 1px solid red;
`;

const Circle = styled.div<{
  x: number;
  y: number;
  width: number;
  height: number;
}>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  position: absolute;
  top: ${({ y }) => `${y}px`};
  left: ${({ x }) => `${x}px`};
  border: 1px solid red;
  border-radius: 100%;
`;

function App() {
  const [firstSquare, setFirstSquare] = useState({
    x: 0,
    y: 0,
  });
  const [firstCircle, setFirstCircle] = useState({
    x: 0,
    y: 0,
  });
  const [width, setWidth] = useState({
    square: 0,
    circle: 0,
  });
  const [height, setHeight] = useState({
    square: 0,
    circle: 0,
  });
  const [drawStatus, setDrawStatus] = useState({
    square: true,
    circle: true,
  });
  const [visible, setVisible] = useState(true);
  const [drawTarget, setDrawTarget] = useState<"square" | "circle">("square");

  const handleDraw = (type: "square" | "circle") => () => {
    setDrawTarget(type);
  };

  const hanldeMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { offsetX, offsetY } = e.nativeEvent;

    switch (drawTarget) {
      case "circle":
        return drawStatus.circle && setFirstCircle({ x: offsetX, y: offsetY });

      default:
        return drawStatus.square && setFirstSquare({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { offsetX, offsetY } = e.nativeEvent;

    switch (drawTarget) {
      case "circle":
        if (firstCircle.x !== 0 && firstCircle.y !== 0) {
          if (firstCircle.x < offsetX) {
            drawStatus.circle &&
              setWidth({ ...width, circle: offsetX - firstCircle.x });
          }
          if (firstCircle.y < offsetY) {
            drawStatus.circle &&
              setHeight({ ...width, circle: offsetY - firstCircle.y });
          }
        }
        break;

      default:
        if (firstSquare.x !== 0 && firstSquare.y !== 0) {
          if (firstSquare.x < offsetX) {
            drawStatus.square &&
              setWidth({ ...width, square: offsetX - firstSquare.x });
          }
          if (firstSquare.y < offsetY) {
            drawStatus.square &&
              setHeight({ ...width, square: offsetY - firstSquare.y });
          }
        }
        break;
    }
  };

  const handleMouseUp = () => {
    switch (drawTarget) {
      case "circle":
        return setDrawStatus({ ...drawStatus, circle: false });

      default:
        return setDrawStatus({ ...drawStatus, square: false });
    }
  };
  const handleAllDelete = () => {
    setVisible(false);
    window.localStorage.clear()
  };
  const handleSave = () => {
    window.localStorage.setItem("squareX", firstSquare.x.toString());
    window.localStorage.setItem("squareY", firstSquare.y.toString());
    window.localStorage.setItem("squareWidth", width.square.toString());
    window.localStorage.setItem("squareHeight", height.square.toString());
    window.localStorage.setItem(
      "squareStatus",
      drawStatus.square ? "true" : "false"
    );

    window.localStorage.setItem("circleX", firstCircle.x.toString());
    window.localStorage.setItem("circleY", firstCircle.y.toString());
    window.localStorage.setItem("circleWidth", width.circle.toString());
    window.localStorage.setItem("circleHeight", height.circle.toString());
    window.localStorage.setItem(
      "circleStatus",
      drawStatus.circle ? "true" : "false"
    );
  };
  useEffect(() => {
    getLocalCache();
  }, []);
  const getLocalCache = async () => {
    const squareX = await localStorage.getItem("squareX");
    const squareY = await localStorage.getItem("squareY");
    const squareWidth = await localStorage.getItem("squareWidth");
    const squareHeight = await localStorage.getItem("squareHeight");
    const squareStatus = await localStorage.getItem("squareStatus");

    const circleX = await localStorage.getItem("circleX");
    const circleY = await localStorage.getItem("circleY");
    const circleWidth = await localStorage.getItem("circleWidth");
    const circleHeight = await localStorage.getItem("circleHeight");
    const circleStatus = await localStorage.getItem("circleStatus");

    setFirstSquare({
      x: Number(squareX),
      y: Number(squareY),
    });
    setFirstCircle({
      x: Number(circleX),
      y: Number(circleY),
    });
    setWidth({ circle: Number(circleWidth), square: Number(squareWidth) });
    setHeight({ circle: Number(circleHeight), square: Number(squareHeight) });
    setDrawStatus({
      circle: circleStatus === "false" ? false : true,
      square: squareStatus === "false" ? false : true,
    });
  };

  return (
    <div className="App">
      <button onClick={handleDraw("square")}>네모</button>
      <button onClick={handleDraw("circle")}>원</button>
      <button onClick={handleAllDelete}>지우기</button>
      <button onClick={handleSave}>저장</button>

      현재 상태 : {drawTarget}
      <Container
        onMouseDown={hanldeMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {visible && (
          <>
            <Box
              x={firstSquare.x}
              y={firstSquare.y}
              width={width.square}
              height={height.square}
            />
            <Circle
              x={firstCircle.x}
              y={firstCircle.y}
              width={width.circle}
              height={height.circle}
            />
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
