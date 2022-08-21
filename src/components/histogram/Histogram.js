import { Bar } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import useMeasure from "react-use-measure";
import styled from "styled-components";
import { Group } from "@visx/group";
import { TooltipWithBounds, useTooltip, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";

const Container = styled.div`
  width: 600px;
  height: 500px;
  position: relative;
`;

const tooltipStyles = {
    ...defaultStyles,
    borderRadius: 4,
    background: "black",
    color: "white",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  };

const margin = 55;

const Histogram = ({data}) => {
  const [ref, bounds] = useMeasure();
  const {
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipLeft = 0,
  tooltipTop = 0,
} = useTooltip();


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
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
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
                  onMouseMove={(event) => {
                    const point = localPoint(event);
                    // const { x } = localPoint(event) || {x: 0};
                    if (!point) return;

                    showTooltip({
                      tooltipData:  month,
                      tooltipLeft: point.x,
                      tooltipTop: yScale(getYValue(month)),
                     
                    });
                  }}
                  onMouseLeave={() => hideTooltip()}
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

        {tooltipData ? (
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            style={tooltipStyles}
          >
            <b>{getYValue(tooltipData)}</b>
          </TooltipWithBounds>
        ) : null}


      </Container>
 
  );
};

export default Histogram;