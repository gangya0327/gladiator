export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true
    }]
  ],
  routes: [
    { path: '/', component: './index' },
    {
      path: '/about', component: './about'
    },
    {
      path: 'users',
      component: './users/_layout',
      routes: [
        { path: '/users', component: './users/index' },
        { path: '/users/:id', component: './users/[id]' }
      ]
    },
    { component: './NotFound' }
  ]
}