/datum/pda_program
	var/name = "Generic program"
	var/is_hidden = FALSE // Показывать ли эту программу в ПДА в списке программ?
	var/req_access = list()
	var/obj/item/weapon/cartridge/parent_cartridge

/datum/pda_program/proc/can_use(/mob/living/user, /obj/item/device/pda/pda)
	if(req_access.len)
		if (!istype(user))
			return FALSE
		for(var/req in req_access)
			if(req in pda.GetAccess())
				return TRUE
		return FALSE

	return TRUE

/datum/pda_program/proc/activate(/mob/living/user, /obj/item/device/pda/pda)
