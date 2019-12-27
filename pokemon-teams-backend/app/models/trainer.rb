class Trainer < ApplicationRecord
  has_many :pokemons

  #accepts_nested_attributes_for :pokemons
  #validates_associated: :po
end
