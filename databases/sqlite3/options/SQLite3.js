export const getOptions = URL => ({
  client: 'sqlite3',
  connection: {
    filename: URL
  },
  useNullAsDefault: true
})
