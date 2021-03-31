import router from './router'

router.beforeEach((to, from, next) => {
 console.log()
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})
