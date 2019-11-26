class ApplicationController < ActionController::API
  def index
    render :file => "./pokemon-teams-frontend/index.html" and return
  end
end
