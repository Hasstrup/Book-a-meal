export const devServer = ({ host, port }) => ({
  devServer: {
    host,
    port,
    open: true,
    overlay: true
  }
});

export default { };
