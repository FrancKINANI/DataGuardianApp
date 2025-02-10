package com.dataguardian.ui.screens.settings

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dataguardian.data.models.Settings
import com.dataguardian.data.repository.SettingsRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SettingsViewModel @Inject constructor(
    private val settingsRepository: SettingsRepository
) : ViewModel() {

    private val _settings = MutableStateFlow(Settings())
    val settings: StateFlow<Settings> = _settings.asStateFlow()

    init {
        loadSettings()
    }

    private fun loadSettings() {
        viewModelScope.launch {
            settingsRepository.getSettings().collect { settings ->
                _settings.value = settings
            }
        }
    }

    fun updateNotificationSettings(enabled: Boolean) {
        viewModelScope.launch {
            val updatedSettings = _settings.value.copy(notificationsEnabled = enabled)
            settingsRepository.updateSettings(updatedSettings)
            _settings.value = updatedSettings
        }
    }

    fun updateHistorySettings(enabled: Boolean) {
        viewModelScope.launch {
            val updatedSettings = _settings.value.copy(keepHistory = enabled)
            settingsRepository.updateSettings(updatedSettings)
            _settings.value = updatedSettings
        }
    }

    fun updateFilteringSettings(enabled: Boolean) {
        viewModelScope.launch {
            val updatedSettings = _settings.value.copy(filteringEnabled = enabled)
            settingsRepository.updateSettings(updatedSettings)
            _settings.value = updatedSettings
        }
    }
} 