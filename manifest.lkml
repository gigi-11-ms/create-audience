
project_name: "audience-creation"

application: vis {
  # file: "bundle.js"
  url: "https://localhost:3000/bundle.js"
  mount_points: {
    dashboard_vis: yes
    standalone: no
    dashboard_tile: yes
  }
  entitlements: {
    local_storage: yes
    use_form_submit: yes
    core_api_methods: []
    external_api_urls: ["https://dia-audience-manager-948043638698.europe-southwest1.run.app"]
    oauth2_urls: []
    scoped_user_attributes: []
    global_user_attributes: ["first_name", "last_name", "email", "name"]
  }
}

application: tile {
  label: "Audience Creation Form"
  # file: "bundle.js"
  url: "https://localhost:3000/bundle.js"
  mount_points: {
    dashboard_tile: yes
    standalone: no
    dashboard_vis: yes
  }
  entitlements: {
    local_storage: yes
    use_form_submit: yes
    core_api_methods: ["run_inline_query","all_lookml_models"]
    external_api_urls: ["https://dia-audience-manager-948043638698.europe-southwest1.run.app"]
    oauth2_urls: []
    scoped_user_attributes: []
    global_user_attributes: ["first_name", "last_name", "email", "name"]
  }
}
