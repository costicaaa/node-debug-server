<template>
    <div>
        <div class="app_page1">

            <div class="row">
                <div class="col-sm-4" id="left">
                    <debug-column :logs="collectedLogs"></debug-column>
                </div>
                <div class="col-sm-4" id="middle">
                    <debug-column :logs="collectedLogs"></debug-column>
                </div>
                <div class="col-sm-4" id="right">
                    <debug-column :logs="collectedLogs"></debug-column>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import io from 'socket.io-client';
    import DebugColumn from "./DebugColumn";

    let host = 'http://localhost:6006';
    // let host = 'http://10.0.2.2:6006';

    const socket = io(host, {
        path: '/sockets'
    });

    export default {
        name: 'HelloWorld',
        components: {DebugColumn},
        props: {
            columns: Number
        },
        data() {
            return {
                logs: []
            }
        },
        computed: {
            collectedLogs() {
                return (this.$coll.collect(this.logs)).sortByDesc('unix_time');
            }
        },
        mounted() {
            socket.on('new-log', (data) => {
                this.logs.push(data);
            });
            socket.on('connection', function (data) {
                console.log('connected');
            });
        }
    }
</script>

<style scoped lang="scss">

    .app_page1 {
        color: #636363;
        margin: 0;
        overflow: hidden;
        height: 100%;
    }

    @media (min-width: 768px) {
        #left {
            position: absolute;
            top: 0px;
            bottom: 0;
            left: 0;
            width: 33%;
            overflow-y: scroll;
        }

        #middle {
            position: absolute;
            top: 0px;
            bottom: 0;
            left: 33%;
            width: 33%;
            overflow-y: scroll;
        }

        #right {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            overflow-y: scroll;
            width: 34%;
            left: 66%;
        }
    }

    #left {
        background-color: #18171B;
        text-align: center;
        height: 100%;
    }

    #middle {
        background-color: #18171B;
        text-align: center;
        height: 100%;
    }

    #right {
        height: 100%;
        background-color: #18171B;
        text-align: center;
    }

    h4 {
        padding: 10px 0;
    }

    .tool-card {
        border: 2px solid black;
        padding: 10px 10px;
        margin: 10px 0;
    }
</style>
