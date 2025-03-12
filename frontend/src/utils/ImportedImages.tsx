const images = Object.values(
  import.meta.glob("/src/assets/AboutUs/*.{png,jpg,jpeg,svg}", { eager: true })
).map((img) => (img as { default: string }).default);

export default images;
