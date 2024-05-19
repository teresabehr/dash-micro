# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''Micro <- function(id=NULL, fileUrl=NULL) {
    
    props <- list(id=id, fileUrl=fileUrl)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Micro',
        namespace = 'micro',
        propNames = c('id', 'fileUrl'),
        package = 'micro'
        )

    structure(component, class = c('dash_component', 'list'))
}
