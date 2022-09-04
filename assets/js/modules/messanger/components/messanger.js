Vue.component("messanger", {
    data: function () {
        return {
            module: 'visitors',
        }
    },

    created() {
        //
    },

    methods: {
        moduleActive: function (event) {
            $('.modulesList button').removeClass('btn-primary');
            event.target.classList.toggle('btn-primary')
            this.module = event.target.name;
        },
        showToast() {
            const h = this.$createElement;
            const vNodesTitle = h(
              'div',
              { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
              [
                h('b-spinner', { props: { type: 'grow',variant : "warning", small: true, class:['mt-4','mr-2'] } }),
                h('strong', { class: ['m-2'] }, 'Connecting...'),
                h('small', { class: 'ml-auto text-italics' }, '5 minutes ago')
              ]
            );
            // Pass the VNodes as an array for message and title
            this.$bvToast.toast([], {
              title: [vNodesTitle],
              solid: true,
              variant: 'default'
            });
        }
    },
    template: 
    `
<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
            <h3 class="gradient-text">My Messanger</h3>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <template>
    </nav>
    <div class="container-fluid">
        <div class="row" v-bind:class="module" v-on:click.prevent>
            <div class="mt-2 bg-light col-sm-2 text-center">
                <div class="btn-group modulesList">
                    <button class="btn btn-primary" name="visitors" @click="moduleActive($event)">Chats</button>
                    <button class="btn" name="Agents">Agents</button>
                </div>  

                <div v-if="module === 'visitors'">
                    <visitorConversations :module="module"></visitorConversations>
                </div>
            </div>

            <div class="col-sm-8 border-right border-left">

                <div v-if="module === 'visitors'">
                    <visitorMessages :module="module"></visitorMessages>
                </div>
            </div>

            <div class="col-sm-2 mt-2 text-center">
                <div class="btn-group">
                    <button type="button" class="btn btn-light"  @click="showToast">
                        <i class="far fa-circle text-success mr-1"></i>
                        I'm Availble
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
})