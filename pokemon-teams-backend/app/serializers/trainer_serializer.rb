class TrainerSerializer < ActiveModel::Serializer
  attributes :id, :name, :pokemons
  has_many :pokemons
end
