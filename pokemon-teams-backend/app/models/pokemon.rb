class Pokemon < ApplicationRecord
#class Pokemon < ActiveRecord::Base
  belongs_to :trainer
end
