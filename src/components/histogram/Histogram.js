import { Bar } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import useMeasure from "react-use-measure";
import styled from "styled-components";
import { Group } from "@visx/group";


const Container = styled.div`
  width: 600px;
  height: 500px;
`;

const margin = 55;

const Histogram = ({data}) => {
    console.log(data)
  const [ref, bounds] = useMeasure();

  const width = bounds.width || 100;
  const height = bounds.height || 100;

  const innerWidth = width - margin;
  const innerHeight = height - margin;

  const xScale = scaleBand({
        range: [margin, innerWidth],
        domain: Object.keys(data),
        padding: 0.5,
      })

  const yScale = scaleLinear({
        range: [innerHeight, margin],
        domain: [
            0,
            Math.max(...Object.values(data))
        ],
      })

  const getXValue = (data) => data[0];
  const getYValue = (data) => data[1];

  console.log(Object.keys(data))
  console.log(Object.values(data))

  return (
  
      <Container ref={ref}>
        <svg width="100%" height="100%">
          <Group>
            {Object.entries(data).map((month, key) => {
              const xValue = getXValue(month);
              const barWidth = xScale.bandwidth();
              const barHeight = innerHeight - (yScale(getYValue(month)) ?? 0);
              const barX = xScale(xValue);
              const barY = innerHeight - barHeight;

              return (
                <Bar
                  key={key}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill="orange"
                />
              );
            })}
          </Group>

          <Group>
            <AxisBottom
              top={innerHeight}
              scale={xScale}
              label={'Months'}
            />
          </Group>

          <Group>
            <AxisLeft left={margin} scale={yScale} label={'Number of posts'} />
          </Group>
        </svg>

      </Container>
 
  );
};

export default Histogram;