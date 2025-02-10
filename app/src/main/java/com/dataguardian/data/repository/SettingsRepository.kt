package com.dataguardian.data.repository

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore
import com.dataguardian.data.models.Settings
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")

@Singleton
class SettingsRepository @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private object PreferencesKeys {
        val NOTIFICATIONS_ENABLED = booleanPreferencesKey("notifications_enabled")
        val KEEP_HISTORY = booleanPreferencesKey("keep_history")
        val FILTERING_ENABLED = booleanPreferencesKey("filtering_enabled")
        val HISTORY_RETENTION_DAYS = intPreferencesKey("history_retention_days")
        val NOTIFY_SUSPICIOUS_TRAFFIC = booleanPreferencesKey("notify_suspicious_traffic")
        val NOTIFY_DATA_USAGE = booleanPreferencesKey("notify_data_usage")
    }

    fun getSettings(): Flow<Settings> = context.dataStore.data.map { preferences ->
        Settings(
            notificationsEnabled = preferences[PreferencesKeys.NOTIFICATIONS_ENABLED] ?: true,
            keepHistory = preferences[PreferencesKeys.KEEP_HISTORY] ?: true,
            filteringEnabled = preferences[PreferencesKeys.FILTERING_ENABLED] ?: false,
            historyRetentionDays = preferences[PreferencesKeys.HISTORY_RETENTION_DAYS] ?: 30,
            notifyOnSuspiciousTraffic = preferences[PreferencesKeys.NOTIFY_SUSPICIOUS_TRAFFIC] ?: true,
            notifyOnDataUsage = preferences[PreferencesKeys.NOTIFY_DATA_USAGE] ?: true
        )
    }

    suspend fun updateSettings(settings: Settings) {
        context.dataStore.edit { preferences ->
            preferences[PreferencesKeys.NOTIFICATIONS_ENABLED] = settings.notificationsEnabled
            preferences[PreferencesKeys.KEEP_HISTORY] = settings.keepHistory
            preferences[PreferencesKeys.FILTERING_ENABLED] = settings.filteringEnabled
            preferences[PreferencesKeys.HISTORY_RETENTION_DAYS] = settings.historyRetentionDays
            preferences[PreferencesKeys.NOTIFY_SUSPICIOUS_TRAFFIC] = settings.notifyOnSuspiciousTraffic
            preferences[PreferencesKeys.NOTIFY_DATA_USAGE] = settings.notifyOnDataUsage
        }
    }
} 