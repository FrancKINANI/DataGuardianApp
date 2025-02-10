package com.dataguardian.data.models

data class Settings(
    val notificationsEnabled: Boolean = true,
    val keepHistory: Boolean = true,
    val filteringEnabled: Boolean = false,
    val historyRetentionDays: Int = 30,
    val notifyOnSuspiciousTraffic: Boolean = true,
    val notifyOnDataUsage: Boolean = true
) 