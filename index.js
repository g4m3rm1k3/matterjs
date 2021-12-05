const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } =
  Matter;

const width = window.innerWidth-20;
const height = window.innerHeight-20;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);
World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);

const walls = [
  Bodies.rectangle(width/2, height, width, 10, { isStatic: true }),
  Bodies.rectangle(-5, height/2, 10, height, { isStatic: true }),
  Bodies.rectangle(width+5, height/2, 10, height, { isStatic: true }),
  Bodies.rectangle(width/2, -5, width, 10, { isStatic: true }),
];
World.add(world, walls);

for (let i = 0; i < width/20; i++) {
  isTrue = (Math.random() > 1) ? true:false;
  const color =
    "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
  const xpos = Math.floor(Math.random() * width);
  const ypos = Math.floor(Math.random() * height);
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(xpos, ypos, 50, 50, {
        isStatic: isTrue,
        render: {
          fillStyle: color,
        },
      })
    );
  } else {
    World.add(
      world,
      Bodies.circle(xpos, ypos, 25, {
        isStatic: isTrue,
        render: {
          fillStyle: color,
        },
      })
    );
  }
}
