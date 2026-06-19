// Brand-blue and purple-blend dominant; orange (the logo's loudest color)
// appears on only 2 of 20 nodes — a sparing strategic accent, not a third
// equal-weight hue.
const NODES = [
  [120, 90, "#4e56b8"], [260, 60, "#4e56b8"], [400, 110, "#6b4fbf"],
  [520, 70, "#4e56b8"], [640, 130, "#6b4fbf"], [760, 80, "#6b4fbf"],
  [80, 220, "#4e56b8"], [220, 250, "#4e56b8"], [360, 220, "#f24a1d"],
  [500, 260, "#6b4fbf"], [620, 240, "#4e56b8"], [740, 220, "#4e56b8"],
  [150, 380, "#6b4fbf"], [300, 360, "#4e56b8"], [440, 400, "#6b4fbf"],
  [580, 370, "#4e56b8"], [700, 400, "#6b4fbf"], [60, 460, "#4e56b8"],
  [350, 480, "#6b4fbf"], [600, 470, "#f24a1d"],
] as const;

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [0, 7], [1, 8], [2, 9], [3, 10], [4, 11], [5, 11],
  [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
  [7, 13], [8, 14], [9, 15], [10, 16],
  [12, 13], [13, 14], [14, 15], [15, 16],
  [12, 17], [13, 18], [15, 19],
];

export function StaticNetworkFallback() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-hidden="true"
    >
      <rect width="800" height="600" fill="#ffffff" />
      <g stroke="#4e56b8" strokeOpacity="0.35" strokeWidth="1">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
          />
        ))}
      </g>
      <g>
        {NODES.map(([x, y, color], i) => (
          <circle key={i} cx={x} cy={y} r={4} fill={color} fillOpacity="0.85" />
        ))}
      </g>
    </svg>
  );
}
