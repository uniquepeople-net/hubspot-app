<template>
	<div>
		<div v-if="groups" >
			<div class="row g-3" v-for="(group, indexG) in groups" :key="group.id">
				<h5 :class="{'mt-5': indexG !== 0, 'text-value': true}">{{ group.name }}</h5>
				<BoardMemberItem v-for="(member, indexM) in group.board_members" :key="member.id" 
								class="col-12 col-lg-6 col-xl-4" :member="member"/>
			</div>
		</div>
		<LoadingIcon v-if="!groups || !members"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
import LoadingIcon from '../../../global/LoadingIcon.vue'
	import BoardMemberItem from './BoardMemberItem.vue'

	export default {
		created() {
			this.$store.dispatch('boardSet/getBoardMembers')
			this.$store.dispatch('boardSet/getBoardGroups')
		},
		data() {
			return {
			}
		},
		methods: {
			checkMember(member, id) {
				if ( member && 'board_groups' in member ) {
					return member.board_groups.some( item => item.id === id)
				} else {
					return false
				}
			}
		},
		computed: {
			...mapGetters({ members: 'boardSet/boardMembers',
							groups: 'boardSet/boardGroups' }),
			/* groupsMembers() {
				( this.groups && this.members ) && this.groups.map( group => {
					group.members = []
					this.members.map( member => {
						if ( 'board_groups' in member ) {
							if (member.board_groups.some( item => item.id === group.id) ) {
								group.members.push(member)
							}
						}
					})
				})
				return this.groups
			} */
			
		},
		components: { BoardMemberItem, LoadingIcon },
	}
</script>
 
 
<style lang='scss' scoped>
</style>