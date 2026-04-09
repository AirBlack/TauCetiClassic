/datum/pda_program/ui
	var/tgui_class = ""

/// Обработка действий из TGUI
/datum/pda_program/ui/proc/act(action, data, /mob/living/user, /obj/item/device/pda/pda)

/// Данные для TGUI
/datum/pda_program/ui/proc/get_data(/mob/living/user, /obj/item/device/pda/pda)
	return list()
