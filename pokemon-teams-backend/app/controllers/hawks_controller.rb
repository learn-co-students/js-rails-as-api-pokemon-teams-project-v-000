class HawksController < ApplicationController
  def index
    hawks = Hawk.all
    render json: hawks.to_json(except: [:created_at, :updated_at])
  end


  def show
    hawk = Hawk.find_by(id: params[:id])
    if hawk
      render json: {id: hawk.id, known_as: hawk.name, technical_classification: hawk.species }
    else
      render json: { message: 'Hawk not found' }
    end
  end
#########################IMPORTANT FOR PORTFOLIO PROJECT########################
################################################################################
  def create
    hawkData = {
      # The first value [name:] corresponds to the backend object model
      # The second value [params[:name]] corresponds to the frontend
      name: params[:java_script_name],
      species: params[:java_script_species]
    }
      Hawk.create(hawkData)
      #render json: hawk
  end
end
################################################################################
################################################################################
