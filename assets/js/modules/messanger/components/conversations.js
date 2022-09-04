const MessangerConversation = Vue.component("conversations", {
    mixins: [utils],
    props: {
        module: '',
    },

    data: function () {
        return ({
            chatActive : 0,
        });
    },

    created() {
        //
    },

    methods: {
        activeChat(profile){
            this.chatActive = profile.id;
            let chat = {
                profile : profile,
                messages : (this.messages[profile.id])?this.messages[profile.id]:[]
            }
            this.$root.$refs[this.module].showChat(chat);
        },
    },

    template:
        `
        <div class="d-flex flex-column mt-2 chat-profile">
            <div v-for="profile in profiles" :key="profiles.id">
                <div class="card" 
                    @click ="activeChat(profile)" 
                    :class="{ 'profile-active' : chatActive == profile.id }"
                >
                <div class="row mt-2">
                    <div class="col-sm-4">
                        <img :src="profile.chatImage" 
                            class="profile-pic float-left rounded-circle m-1" alt="profile-pic">
                            <span style="position: absolute;right: 10%;margin-top: 45%;">
                                <i v-if="profile.status === 'ACTIVE'"  class="fas fa-circle text-success mr-1"></i>
                                <i v-if="profile.status === 'DND'" class="fas fa-circle text-danger mr-1"></i>
                            </span>
                    </div>
                    <div class="col-sm-8 text-left">
                        <h6>{{ profile.chatName }}</h6>
                        <span class="text-secondary" >{{profile.lastChat.content}}</span><br>
                        <small class="text-secondary" >
                            <timeago :datetime="profile.lastChat.createdOn" :auto-update="60"></timeago>
                        </small>
                    </div>
                </div>
                </div>
            </div>
        </div>
        `
});