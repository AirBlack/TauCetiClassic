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

/atom/movable/screen/inventory/hand/big
	icon = 'icons/hud/bighud/inhands.dmi'
	copy_flags = NONE

/atom/movable/screen/inventory/hand/big/update_icon(mob/mymob)
	. = ..()
	icon_state = initial(icon_state) + ((mymob.hand == hand_index) ? "_select" : "_deselect")

/atom/movable/screen/inventory/hand/big/l
	name = "Left hand"
	icon_state = "lefthand"
	screen_loc = bigui_lefthand_back
	hand_index = 1

/atom/movable/screen/inventory/hand/big/l/add_to_hud(datum/hud/hud)
	. = ..()
	hud.mymob.l_hand_hud_object = src

/atom/movable/screen/inventory/hand/big/r
	name = "Right hand"
	icon_state = "righthand"
	screen_loc = bigui_righthand_back
	hand_index = 0

/atom/movable/screen/inventory/hand/big/r/add_to_hud(datum/hud/hud)
	. = ..()
	hud.mymob.r_hand_hud_object = src

/atom/movable/screen/handbutton
	name = "handbutton"
	icon = 'icons/hud/bighud/inhands.dmi'
	copy_flags = NONE
	var/hand_index = 0

/atom/movable/screen/handbutton/update_icon(mob/mymob)
	icon_state = initial(icon_state) + ((mymob.hand == hand_index) ? "_on" : "_off")

/atom/movable/screen/handbutton/add_to_hud(datum/hud/hud)
	. = ..()
	update_icon(hud.mymob)

/atom/movable/screen/handbutton/action()
	. = ..()
	var/mob/living/carbon/carbon = usr
	if(istype(carbon))
		carbon.activate_hand(hand_index)

/atom/movable/screen/handbutton/l
	name = "Switch to left hand"
	icon_state = "lefthand_button"
	hand_index = 1
	screen_loc = bigui_lefthand_button

/atom/movable/screen/handbutton/l/add_to_hud(datum/hud/hud)
	. = ..()
	var/mob/living/carbon/human/human = hud.mymob
	if(istype(human))
		human.l_hand_hud_button = src

/atom/movable/screen/handbutton/r
	name = "Switch to right hand"
	icon_state = "righthand_button"
	screen_loc = bigui_righthand_button

/atom/movable/screen/handbutton/r/add_to_hud(datum/hud/hud)
	. = ..()
	var/mob/living/carbon/human/human = hud.mymob
	if(istype(human))
		human.r_hand_hud_button = src

/atom/movable/screen/zoom
	name = "Zoom"
	icon = 'icons/hud/bighud/zoom.dmi'
	icon_state = "zoom_off"
	screen_loc = bigui_zoom
	copy_flags = NONE

/atom/movable/screen/resist/big
	icon = 'icons/hud/bighud/screen64.dmi'
	icon_state = "resist"
	screen_loc = bigui_resist
	copy_flags = NONE

/atom/movable/screen/resist/big/action()
	. = ..()
	flick(icon_state + "_anim", src)

/atom/movable/screen/inventory/craft/big
	icon = 'icons/hud/bighud/screen64.dmi'
	icon_state = "craft"
	screen_loc = bigui_craft
	copy_flags = NONE

/atom/movable/screen/inventory/craft/big/action()
	. = ..()
	flick(icon_state + "_anim", src)

/atom/movable/screen/speech
	name = "Speech"
	icon = 'icons/hud/bighud/screen64.dmi'
	icon_state = "speech"
	screen_loc = bigui_speech
	copy_flags = NONE

/atom/movable/screen/speech/action()
	var/mob/mob = usr
	if(istype(mob))
		flick(icon_state + "_anim", src)
		mob.say_wrapper()

/atom/movable/screen/whisper
	name = "Whisper"
	icon = 'icons/hud/bighud/screen64.dmi'
	icon_state = "whisper"
	screen_loc = bigui_whisper
	copy_flags = NONE

/atom/movable/screen/whisper/action()
	var/mob/mob = usr
	if(istype(mob))
		flick(icon_state + "_anim", src)
		mob.whisper_wrapper()

/atom/movable/screen/emotes
	name = "Emotes"
	icon = 'icons/hud/bighud/screen64.dmi'
	icon_state = "emotes"
	screen_loc = bigui_emotes
	copy_flags = NONE

/atom/movable/screen/emotes/action()
	var/mob/living/carbon/human/human = usr
	if(istype(human))
		human.emote_panel()
		flick(icon_state + "_anim", src)

/atom/movable/screen/move_intent/big
	name = "Move intent"
	icon = 'icons/hud/bighud/screen64.dmi'
	screen_loc = bigui_walk
	copy_flags = NONE

/atom/movable/screen/crawl
	name = "Crawl"
	icon = 'icons/hud/bighud/screen64.dmi'
	icon_state = "standing"
	screen_loc = bigui_crawl
	copy_flags = NONE

/atom/movable/screen/crawl/action()
	var/mob/living/living = usr
	if(istype(living))
		living.crawl()

/atom/movable/screen/crawl/update_icon(mob/mymob)
	icon_state = (mymob.crawling ? "crawling" : "standing")

/atom/movable/screen/crawl/add_to_hud(datum/hud/hud)
	..()
	update_icon(hud.mymob)
	var/mob/living/carbon/human/human = hud.mymob
	if(istype(human))
		human.hud_crawl_object = src
