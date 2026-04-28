/atom/movable/screen/backhud
	name = ""
	icon = 'icons/hud/bighud/backhud.dmi'
	icon_state = "backhud"
	screen_loc = bigui_backhud
	copy_flags = NONE

/atom/movable/screen/health_status
	name = "health status"
	icon = 'icons/hud/bighud/health_status_screen.dmi'
	icon_state = "status0"
	screen_loc = bigui_healthstatus

	copy_flags = NONE

/atom/movable/screen/health_status/add_to_hud(datum/hud/hud)
	..()
	var/mob/living/carbon/human/human = hud.mymob
	if(istype(human))
		human.hud_health_status = src

/atom/movable/screen/health/big
	icon = 'icons/hud/bighud/heart_rate.dmi'
	icon_state = "health0"
	screen_loc = bigui_heartbeat

/atom/movable/screen/health_doll/big
	icon = 'icons/hud/bighud/healthdoll.dmi'
	screen_loc = bigui_healthdoll

/atom/movable/screen/nutrition/big
	icon = 'icons/hud/bighud/screen32.dmi'
	icon_state = "burger0"
	screen_loc = bigui_nutrition

	copy_flags = NONE

/atom/movable/screen/nutrition/big/update_icon(mob/living/carbon/human/mymob)
