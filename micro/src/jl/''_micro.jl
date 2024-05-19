# AUTO GENERATED FILE - DO NOT EDIT

export ''_micro

"""
    ''_micro(;kwargs...)

A Micro component.

Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `fileUrl` (String; optional): The URL for the temp audio file if you saved it to the server.
"""
function ''_micro(; kwargs...)
        available_props = Symbol[:id, :fileUrl]
        wild_props = Symbol[]
        return Component("''_micro", "Micro", "micro", available_props, wild_props; kwargs...)
end

