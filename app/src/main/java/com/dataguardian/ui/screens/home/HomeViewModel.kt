package com.dataguardian.ui.screens.home

import android.app.Application
import android.content.Intent
import android.net.VpnService
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.dataguardian.service.vpn.DataGuardianVpnService
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class HomeViewModel(application: Application) : AndroidViewModel(application) {
    private val _vpnState = MutableStateFlow(VpnState.STOPPED)
    val vpnState: StateFlow<VpnState> = _vpnState

    fun toggleVpn() {
        when (_vpnState.value) {
            VpnState.STOPPED -> startVpn()
            VpnState.RUNNING -> stopVpn()
            VpnState.REQUESTING_PERMISSION -> { /* Ne rien faire */ }
        }
    }

    private fun startVpn() {
        viewModelScope.launch {
            val vpnIntent = VpnService.prepare(getApplication())
            if (vpnIntent != null) {
                _vpnState.value = VpnState.REQUESTING_PERMISSION
            } else {
                startVpnService()
            }
        }
    }

    private fun startVpnService() {
        val intent = Intent(getApplication(), DataGuardianVpnService::class.java).apply {
            action = "START"
        }
        getApplication<Application>().startService(intent)
        _vpnState.value = VpnState.RUNNING
    }

    private fun stopVpn() {
        val intent = Intent(getApplication(), DataGuardianVpnService::class.java).apply {
            action = "STOP"
        }
        getApplication<Application>().startService(intent)
        _vpnState.value = VpnState.STOPPED
    }

    enum class VpnState {
        STOPPED,
        RUNNING,
        REQUESTING_PERMISSION
    }
} 