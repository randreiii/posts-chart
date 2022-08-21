import { useMemo } from "react";
import { Bar } from "@visx/shape";
import appleStock from "@visx/mock-data/lib/mocks/appleStock";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import useMeasure from "react-use-measure";
import styled from "styled-components";
import { timeFormat } from "d3-time-format";
import { Group } from "@visx/group";


const Container = styled.div`
  position: relative;
  width: 600px;
  height: 400px;
  min-width: 300px;
`;

const margin = 32;

const Histogram = ({data}) => {
  const [ref, bounds] = useMeasure();

  const width = bounds.width || 100;
  const height = bounds.height || 100;

  const innerWidth = width - margin;
  const innerHeight = height - margin;

  const xScale = useMemo(
    () =>
      scaleBand({
        range: [margin, innerWidth],
        domain: Object.keys(data),
        padding: 0.2,
      }),
    [innerWidth, data]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight, margin],
        domain: [
            0,
            Math.max(...Object.values(data))
        ],
      }),
    [innerHeight, data]
  );

  return (
  
      <Container ref={ref}>
        <svg width="100%" height="100%" >
          {/* <Group>
            {data.map((d) => {
              const xValue = getXValue(d);
              const barWidth = xScale.bandwidth();
              const barHeight = innerHeight - (yScale(getYValue(d)) ?? 0);
              const barX = xScale(xValue);
              const barY = innerHeight - barHeight;

              return (
                <Bar
                  key={`bar-${xValue}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill="orange"
                />
              );
            })}
          </Group> */}

          <Group>
            <AxisBottom
              top={innerHeight}
              scale={xScale}
              tickFormat={(date) => timeFormat("%m")(new Date(date))}
            />
          </Group>

          <Group>
            <AxisLeft left={margin} scale={yScale} />
          </Group>
        </svg>

      </Container>
 
  );
};

export default Histogram;