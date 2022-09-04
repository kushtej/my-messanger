const MessangerChatbox = Vue.component('chatbox', {
    mixins: [utils],
    props: {
        module: '',
    },
    data: function () {
        return {
            profileinfo:{},
            messages : [],
            inputText : "",
            notificationURL : "https://kushtej.github.io/hosted/static/audios/notification.mp3",
        }
    },
    watch: {
        messages(newMessage, oldMessage) {
            this.triggerAnimation();
            if(newMessage.length !== 0 && ['VISITOR','SYSTEM'].includes(newMessage[newMessage.length - 1].owner)) {
                const audio = new Audio(this.notificationURL);
                audio.play();
            }
        }
    },
    methods : {
        sendChat() {
            let sendText = this.inputText.trim();
            if(sendText.length!==0) {
                this.messages.push({
                    id : this.messages.length + 1, 
                    type: "MESSAGE", 
                    content : sendText, 
                    owner : 'AGENT', 
                    isLiked : true , 
                    createdOn : new Date()
                });
                this.inputText = "";
                this.receiveChat(sendText)
            }
        },

        triggerAnimation : function(){
            let body = jQuery('.chat-screen');
            if(body[0]){
                body.animate({
                    scrollTop: body[0].scrollHeight
                }, 500);
            }
        },

        receiveChat(userText) {
            self = this
            setTimeout(function() {
                let visitorText = "<b>You said : </b>"+ userText;
                self.messages.push(
                    {
                        id : self.messages.length + 1, 
                        type: "MESSAGE", 
                        content : visitorText, 
                        owner : 'VISITOR', 
                        isLiked : true , 
                        createdOn : new Date()
                    }
                )
            }, 2000);
        }
    },
    template : 
    `
<div>
    <div v-if="isObjectEmpty(profileinfo)">
        <div class="text-center">
            <h3 class="text-center mt-2">Chats will come here</h3>
        </div>
    </div>
    <div v-else>
        <div class="card">
            <div class="card-header p-2">
                <div class="row">
                    <div class="col-sm-2">
                        <img :src="profileinfo.chatImage" class="rounded-circle float-left chat-pic" alt="profile-pic">
                        <strong class="p-2">KushTej</strong>
                        <span v-if="profileinfo.status === 'ACTIVE'">
                            <small class="p-2"><i class="fas fa-circle text-success mr-1"></i>Active</small>
                        </span>
                        <span v-else-if="profileinfo.status === 'DND'">
                            <small class="p-2"><i class="fas fa-circle text-danger mr-1"></i>Busy</small>
                        </span>
                    </div>

                    <div class="col-sm-10">
                        <div class="dropdown dropleft float-right">
                            <i class="float-right fas fa-ellipsis-v dropdown-toggle mt-3" data-toggle="dropdown"></i>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Disconnect</a>
                                <a class="dropdown-item" href="#">Transfer</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container card-body chat-screen">
                <div v-if="messages.length === 0">
                <h3 class="text-center mt-2" style="height:50%">Your Conversation starts Here</h3>
                </div>
                <div v-for="msg in messages" :key="msg.id">
                    
                    <div v-if="msg.owner == 'SYSTEM'" class="divider">
                        <small class="text-secondary" v-html="msg.content">
                        </small>
                    </div>

                    <div v-if="msg.owner == 'VISITOR'">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div v-if="msg.type == 'MESSAGE'" class="border rounded p-2 text-justify" style="width: fit-content;" v-html="msg.content">
                                            <span>
                                                <i class="fas fa-heart text-danger"></i>
                                            </span>
                                        </div>
                                        <div v-if="msg.type == 'IMAGE'">
                                            <img :src="msg.source" class="rounded border p-2" style="max-width: 300px;" alt="image">
                                            <span>
                                                <i class="fas fa-heart text-danger"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-sm-6"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 mb-3">
                                <small class="text-secondary">
                                    <timeago :datetime="msg.createdOn" :auto-update="60"></timeago>
                                </small>
                            </div>
                        </div>
                    </div>

                    <div v-if="msg.owner == 'AGENT'">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="row">
                                    <div class="col-sm-6"></div>
                                    <div class="col-sm-6" style="display: flex; justify-content: flex-end">
                                        <div v-if="msg.type == 'MESSAGE'" class="border rounded p-2 text-justify right-message" style="width: fit-content;" v-html="msg.content">
                                            <span>
                                                <i class="fas fa-heart text-danger"></i>
                                            </span>
                                        </div>
                                        <div v-if="msg.type == 'IMAGE'">
                                        <span>
                                            <i class="fas fa-heart text-danger"></i>
                                        </span>
                                            <img :src="msg.source" class="rounded border p-2" style="max-width: 300px;" alt="image">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 mb-3">
                                <small class="text-secondary" style="display: flex; justify-content: flex-end">
                                    <timeago :datetime="msg.createdOn" :auto-update="60"></timeago>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="inputText" id="inputText" autocomplete="off" placeholder="Type here"
                aria-label="inputText" v-on:keyup.enter="sendChat" aria-describedby="button-addon2">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" v-on:click="sendChat" id="submit"><i
                        class="far fa-paper-plane"></i></button>
            </div>
        </div>
    </div>
</div>
    `
});