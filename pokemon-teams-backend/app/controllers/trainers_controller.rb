class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        # byebug
        options = {
            include: [:pokemons]
        }
        # render json: [trainers, options]
        render json: TrainerSerializer.new(trainers).to_serialized_json
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        options = {
            # include: [:pokemons].
            include: [:pokemon]
        }
        render json: trainer
    end
end