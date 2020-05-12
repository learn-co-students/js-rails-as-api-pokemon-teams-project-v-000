class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: trainers, include: [:pokemons]
        # byebug
        # options = {
        #     include: [:pokemons]
        # }
        # render json: [trainers, options]
        # render json: TrainerSerializer.new(trainers).to_serialized_json
    end

    def show
        trainer = Trainer.find(params [:id])
        render json: trainer, include: [:pokemons]
        # trainer = Trainer.find_by(id: params[:id])
        # options = {
        #     # include: [:pokemons].
        #     include: [:pokemon]
        # }
        # render json: trainer
    end
end