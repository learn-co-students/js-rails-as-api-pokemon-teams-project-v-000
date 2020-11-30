class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        # render json: TrainerSerializer.new(trainers).to_serialized_json
        render json: trainers, include: [:pokemons]
    end

    def show
        trainer = Trainer.find(params[:id])
        render json: trainer, include: [:pokemons]
    end
end