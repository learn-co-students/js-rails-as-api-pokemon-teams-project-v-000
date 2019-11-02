class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: trainers.to_json(include: { pokemon: { only: [:id, :nickname, :species] } }, only: [:id, :name])
  end
end
