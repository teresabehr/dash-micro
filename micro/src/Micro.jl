
module Micro
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.1"

include("jl/''_micro.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "micro",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "micro.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "micro.min.js.map",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = ".\css\micro.css",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :css
)
            ]
        )

    )
end
end
