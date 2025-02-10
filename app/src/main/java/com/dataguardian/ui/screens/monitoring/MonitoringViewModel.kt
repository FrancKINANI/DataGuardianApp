package com.dataguardian.ui.screens.monitoring

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dataguardian.data.models.Connection
import com.dataguardian.data.repository.ConnectionRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import javax.inject.Inject

@HiltViewModel
class MonitoringViewModel @Inject constructor(
    private val connectionRepository: ConnectionRepository
) : ViewModel() {

    private val _connections = MutableStateFlow<List<Connection>>(emptyList())
    val connections: StateFlow<List<Connection>> = _connections.asStateFlow()

    init {
        observeConnections()
    }

    private fun observeConnections() {
        connectionRepository.getAllConnections()
            .onEach { connections ->
                _connections.value = connections.sortedByDescending { it.timestamp }
            }
            .launchIn(viewModelScope)
    }
} 