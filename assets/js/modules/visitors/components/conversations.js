Vue.component('visitorConversations', {
    extends:MessangerConversation,
    mixins: [utils],
    data: function () {
        return {
            profiles: [
                {
                    id:1,
                    chatName : "Jason Bourne",
                    chatImage: "https://kushtej.github.io/app/images/myprofile.png",
                    status : "ACTIVE",
                },
                {
                    id:2,
                    chatName : "Jason Bourne",
                    status : "DND",
                }
            ],
            messages : {
                1 : [
                    {id : 1, type: "MESSAGE", content : "Lorem Ipsum", owner : 'VISITOR', isLiked : true , createdOn : "Sat Sep 03 2022 19:34:19 GMT+0530 (India Standard Time)"},
                    {id : 2, type: "IMAGE", source : "https://images.pexels.com/photos/2422/sky-earth-galaxy-universe.jpg", owner : 'VISITOR', isLiked : true , createdOn : new Date()},
                    {id : 2, type: "MESSAGE", content : "Conversation has Started", owner : 'SYSTEM', isLiked : true , createdOn : new Date()},
                    {id : 3, type: "MESSAGE", content : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", owner : 'VISITOR', isLiked : true , createdOn : new Date()},
                    {id : 4, type: "MESSAGE", content : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", owner : 'AGENT', isLiked : true , createdOn : new Date()},
                    {id : 5, type: "MESSAGE", content : "Lorem Ipsum", owner : 'AGENT', isLiked : true , createdOn : new Date()},
                    {id : 2, type: "IMAGE", source : "https://picsum.photos/200/300", owner : 'VISITOR', isLiked : true , createdOn : new Date()},
                    {id : 2, type: "IMAGE", source : "https://picsum.photos/200/300", owner : 'AGENT', isLiked : true , createdOn : new Date()},
                    {id : 6, type: "MESSAGE", content : "Lorem Ipsum", owner : 'AGENT', isLiked : true , createdOn : new Date()},
                ],
                // 2 : [
                //     {id : 1, type: "MESSAGE", content : "Lorem Ipsum", owner : 'VISITOR', isLiked : true , createdOn : "Sat Sep 03 2022 19:34:19 GMT+0530 (India Standard Time)"},
                //     {id : 2, type: "MESSAGE", content : "Lorem Ipsum", owner : 'AGENT', isLiked : true , createdOn : new Date()},
                // ],
            },
        }
    },

    created() {
        for(let profile of this.profiles) {
            if(!profile.chatImage){
                profile.chatImage = this.generateAvatar(profile.chatName);
            }
            let messages = this.messages[profile.id];
            if(messages) {
                profile.lastChat = messages[messages.length - 1];
                if(profile.lastChat.type === "IMAGE") {
                    profile.lastChat.content = "Image"
                }
            } else {
                profile.lastChat = {
                    content : "-",
                    createdOn : "-"
                }
            }
        }


    },
})