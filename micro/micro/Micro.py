# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Micro(Component):
    """A Micro component.


Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- fileUrl (string; optional):
    The URL for the temp audio file if you saved it to the server."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'micro'
    _type = 'Micro'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, fileUrl=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'fileUrl']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'fileUrl']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(Micro, self).__init__(**args)
