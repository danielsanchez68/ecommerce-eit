export const getOptions = (URL, user, password, database) => ({
    client: 'mysql',
    connection: {
      host : URL,
      user,
      password,
      database
    }
})
