class ApplicationController < ActionController::API
    
    def index
        sightings = Sighting.all
        render json: SightingSerializer.new(sightings)
      end
end
