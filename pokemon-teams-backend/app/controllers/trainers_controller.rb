class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
      #  options = {}
      #  options[:include] = [:pokemons, :'pokemons.attributes']
       # options = {include: [:pokemons]}
      #  options = {include: [:pokemons, :'pokemons.nickname', :'pokemons.species']}
        render json: TrainerSerializer.new(trainers).serialized_json
    end

    def show
        trainer = Trainer.find_by(params[:id])
        render json: TrainerSerializer.new(trainer)
    end

end
