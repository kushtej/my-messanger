// var store = new Vuex.Store({
// 	state: {
//         profile : {},
// 	},
// 	mutations: {
//         storeProfileId (state,data) {
//             state.profile = data.profile;
//         }
//     },
// 	getters: {}
// });


const messangerApp = new Vue({
    el: '#app',
    // store,
    template: `<messanger></messanger>`,
});

Vue.use(VueTimeago, { name: 'timeago' });
// Vue.use(EmojiPicker)


