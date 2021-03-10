// 默认代理
module.exports={
  //单api 默认不用写api
  // devServer:{
  //   proxy:'http://localhost:8081',
  // },
  //多api
    devServer:{
      port:8083,
      proxy:{
        '/api' : {
          target:'http://localhost:8080',
          changeOrigin: true,
          pathRewrite: {
            '^/api' : ''
          }
        }
      }
    },
    configureWebpack :{
        resolve : {
            alias: {
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'router':'@/router',
                'views':'@/views'
            }
        }
    }

}
