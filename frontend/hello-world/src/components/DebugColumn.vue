<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                Tag
                <select v-model="selectedTag" class="form-control">
                    <option value="All">All</option>
                    <template v-for="tag of tags">
                        <option :value="tag">{{tag}}</option>
                    </template>
                </select>
            </div>

            <div class="col-md-6">
                Source
                <select v-model="selectedSource" class="form-control">
                    <option value="All">All</option>
                    <template v-for="tag of sources">
                        <option :value="tag">{{tag}}</option>
                    </template>
                </select>
            </div>
        </div>
        <div >
            <template v-for="log of filteredLogs">
                <div>
                    <span v-html="log.html_output"></span>

                    <p>
                        {{log.date}} | <b>{{log.source}} {{log.tag}}</b> | {{ log.level }}
                    </p>
                </div>
                <hr class="hrClass">
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Column",
        props: ['logs'],
        data(){
            return {
                selectedTag: 'All',
                selectedSource: 'All',

            }
        },
        computed:{
            tags(){
                return this.logs.pluck('tag').unique();
            },

            sources(){
                return this.logs.pluck('source').unique();
            },
            filteredLogs(){
                let filtered = this.logs.all();
                if(this.selectedTag !== 'All'){
                    filtered = filtered.filter(x => x.tag === this.selectedTag);
                }

                if(this.selectedSource !== 'All'){
                    filtered = filtered.filter(x => x.source === this.selectedSource);
                }

                return filtered;
            }

        }
    }
</script>

<style scoped>
    .hrClass {
        /*background-color: #fff;*/
        border-top: 2px dashed #8c8b8b;
    }
</style>
