Vue.component('visitorMessages', {
    extends:MessangerChatbox,
    mixins: [utils],
    data: function () {
        return ({
            profileinfo:{},
            messages : [],
        });
    },

    created() {
        this.$root.$refs.visitors = this;
    },


    methods : {
        clearChat : function(){
            this.profileinfo = {};
        },
        showChat : function(chat){
            this.profileinfo = chat.profile;
            this.messages = chat.messages;
        },
    }
})