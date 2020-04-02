class TrainersController < ApplicationController

    def index
      trainers = Trainer.all
      options = {
        include: [:pokemons]
      }
      render json:TrainerSerializer.new(trainers, options).serialized_json
     end

end
