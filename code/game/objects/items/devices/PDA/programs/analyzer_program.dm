/datum/pda_program/analyzer

/datum/pda_program/analyzer/activate(/mob/living/user, /obj/item/device/pda/pda)
	. = ..()
	if(!.)
		return

	if(pda.analyzer_program == src)
		pda.analyzer_program = null
	else
		pda.analyzer_program = src

/// Для взаимодействия с мобами
/datum/pda_program/analyzer/proc/attack(obj/item/device/pda/pda, mob/living/target, mob/living/user, def_zone, )
	return can_use()

/// Для взаимодействия с атомами
/datum/pda_program/analyzer/proc/afterattack(obj/item/device/pda/pda, atom/target, mob/user, proximity, params)
	return can_use()
